// defineApp — write a cap2UI5 app as ordinary, SYNCHRONOUS JavaScript.
//
//   defineApp("ZCL_HELLO", class {
//     name = "";
//     main(c) {                                   // no async, no await
//       if (c.isInitial) {
//         c.view(`<Input value="${c.bind("name")}"/>
//                 <Button press="${c.event("GO")}"/>`);
//       } else {
//         c.messageBox(`Hello ${this.name}`);
//       }
//     }
//   });
//
// WHY THE APP CAN BE SYNCHRONOUS AT ALL
//
// Every method of the transpiled framework is `async`, but that is the
// transpiler's blanket rule, not a statement about I/O: _bind( ) and _event( )
// await nothing but their own internal calls — measured — and the draft is
// written long after main( ) returns. So nothing the app calls actually waits
// for the outside world, and JavaScript's inability to unwrap a promise
// synchronously is the only obstacle left. It is removed in two ways:
//
//   QUERIES  (bind, event, isInitial) must answer a value the app uses inline,
//            so they cannot be deferred. `isInitial` and every bind path are
//            resolved BEFORE main( ) and handed over as plain values. `event`
//            cannot be — its names are invented by the app — so it returns a
//            PLACEHOLDER token and the real wire string is substituted in
//            afterwards, once the async call can be awaited.
//   COMMANDS (view, messageBox, …) do not answer anything the app reads, so
//            they are RECORDED synchronously and replayed after main( ),
//            in order.
//
// The one consequence worth knowing: between c.event("GO") and the flush, the
// string the app holds is a token, not the wire format. Embedding it in markup
// is what it is for and works; parsing or comparing it does not.
//
// STATE
//
// The framework works on BOXED values (abap.types.*), and _bind( ) matches the
// value it is given by IDENTITY among the app's attributes — its signature has
// no name parameter. So a field must be a box, and `name = ""` must become one.
// defineApp boxes every declared field at construction, derives the ATTRIBUTES
// schema RTTI needs from the same pass, and gives main( ) a PROXY whose reads
// unwrap and whose writes write through. The boxes therefore stay on the
// instance, which is what keeps _bind( ) working.
//
// (An earlier draft replaced the fields with plain values instead of proxying
// them, and _bind( ) answered BINDING_ERROR — rightly: the box was no longer an
// attribute of the object, so there was nothing left to match by identity.)

// ---------------------------------------------------------------- type mapping
//
// Narrow on purpose, and it refuses rather than guesses. Numbers are the real
// ambiguity — ABAP has I, P and F and they render differently — so an integer
// becomes I, a fractional number F, and a decimal amount has to say so with
// t.packed(). Guessing silently produces views with the wrong number of
// decimals and nothing to point at.
export const t = {
  string: () => new abap.types.String({ qualifiedName: "STRING" }),
  int: () => new abap.types.Integer({ qualifiedName: "I" }),
  float: () => new abap.types.Float({ qualifiedName: "F" }),
  bool: () => new abap.types.Character(1, { qualifiedName: "ABAP_BOOL", ddicName: "ABAP_BOOL" }),
  char: (len) => new abap.types.Character(len, {}),
  packed: (length, decimals) => new abap.types.Packed({ length, decimals, qualifiedName: "P" }),
};

const isBoxed = (v) =>
  v !== null && typeof v === "object" && typeof v.get === "function" && typeof v.set === "function";

function boxFor(v) {
  if (typeof v === "string") return t.string().set(v);
  if (typeof v === "boolean") return t.bool().set(v ? "X" : " ");
  if (typeof v === "number") return Number.isInteger(v) ? t.int().set(v) : t.float().set(v);
  if (isBoxed(v)) return v;
  return null;
}

/** ABAP has no boolean; abap_bool is an "X" / " " flag. */
const unwrap = (box, kind) => (kind === "bool" ? box.get() === "X" : box.get());
const wrap = (v, kind) => (kind === "bool" ? (v ? "X" : " ") : v);

/** `name` -> NAME, `z2ui5_if_app$id_draft` -> Z2UI5_IF_APP~ID_DRAFT. */
const abapName = (f) => f.toUpperCase().replace(/\$/g, "~");
const isFrameworkField = (f) => f.includes("$");

// --------------------------------------------------------------------- the wrap
export function defineApp(name, cls, opts = {}) {
  const INTERNAL = String(name).toUpperCase();
  const userMain = cls.prototype.main ?? cls.prototype.z2ui5_if_app$main;
  if (typeof userMain !== "function") {
    throw new Error(`defineApp(${INTERNAL}): the class needs a main( client ) method`);
  }

  class App extends cls {
    constructor(...a) {
      super(...a);
      const attrs = {};
      const kinds = {};
      const undecidable = [];
      for (const [f, v] of Object.entries(this)) {
        if (typeof v === "function") continue;
        const boxed = boxFor(v);
        if (!boxed) { undecidable.push(f); continue; }
        this[f] = boxed;
        kinds[f] = typeof v === "boolean" ? "bool" : typeof v;
        attrs[abapName(f)] = { type: () => boxFor(v) ?? t.string(),
                               visibility: "U", is_constant: " ", is_class: " " };
      }
      for (const f of ["z2ui5_if_app$id_draft", "z2ui5_if_app$id_app"]) {
        if (!isBoxed(this[f])) this[f] = t.string();
        attrs[abapName(f)] = { type: t.string, visibility: "U", is_constant: " ", is_class: " " };
      }
      App.ATTRIBUTES = attrs;
      Object.defineProperty(this, "__kinds", { value: kinds, enumerable: false });
      if (undecidable.length) {
        console.warn(
          `[defineApp] ${INTERNAL}: cannot type ${undecidable.join(", ")} — ` +
            `null/undefined and objects carry no ABAP type. Give an initial value, ` +
            `or declare it with t.packed(…) / t.char(…).`,
        );
      }
    }

    async constructor_() { return this; }

    async z2ui5_if_app$main(input) {
      const c = input.client.get();
      const S = (v = "") => new abap.types.String().set(String(v));

      const boxes = {};
      for (const [f, v] of Object.entries(this)) {
        if (!isFrameworkField(f) && isBoxed(v)) boxes[f] = v;
      }

      // ---- resolve the queries that CAN be resolved up front ---------------
      const isInitial =
        abap.compare.initial(await c.z2ui5_if_client$check_on_navigated({ result: 1 })) === false;
      const paths = {};
      for (const [f, box] of Object.entries(boxes)) {
        paths[f] = (await c.z2ui5_if_client$_bind({ val: box, result: 1 })).get();
      }

      // ---- the synchronous surface the app sees ----------------------------
      const TOK = (n) => `\u0000z2ui5:evt:${n}\u0000`;
      const events = new Set();
      const queue = [];
      const facade = {
        isInitial,
        bind(field) {
          if (!(field in paths)) {
            throw new Error(
              `c.bind("${field}"): not a bindable field of this app — ` +
                `known: ${Object.keys(paths).join(", ") || "(none)"}`,
            );
          }
          return paths[field];
        },
        event(n) { events.add(String(n)); return TOK(n); },
        view(xml) { queue.push(["view", xml]); },
        messageBox(text) { queue.push(["box", text]); },
        messageToast(text) { queue.push(["toast", text]); },
        raw: c,                                  // escape hatch, still async
      };

      // ---- run the app: no async needed on its side ------------------------
      const self = this;
      const plain = new Proxy(this, {
        get(tgt, prop, recv) {
          const v = Reflect.get(tgt, prop, recv);
          if (typeof prop === "string" && boxes[prop]) return unwrap(v, self.__kinds?.[prop]);
          return typeof v === "function" ? v.bind(tgt) : v;
        },
        set(tgt, prop, value) {
          if (typeof prop === "string" && boxes[prop]) {
            boxes[prop].set(wrap(value, self.__kinds?.[prop]));
            return true;
          }
          return Reflect.set(tgt, prop, value);
        },
      });
      await userMain.call(plain, facade);        // await: an async main still works

      // ---- flush: resolve the event tokens, then replay the commands -------
      const wire = {};
      for (const n of events) {
        wire[TOK(n)] = (await c.z2ui5_if_client$_event({ val: S(n), result: 1 })).get();
      }
      const subst = (s) => {
        let out = String(s);
        for (const [tok, real] of Object.entries(wire)) out = out.split(tok).join(real);
        return out;
      };
      for (const [kind, arg] of queue) {
        if (kind === "view") await c.z2ui5_if_client$view_display({ val: S(subst(arg)) });
        else if (kind === "box") await c.z2ui5_if_client$message_box_display({ text: S(subst(arg)) });
        else if (kind === "toast") await c.z2ui5_if_client$message_toast_display({ text: S(subst(arg)) });
      }
    }
  }

  App.INTERNAL_TYPE = "CLAS";
  App.INTERNAL_NAME = INTERNAL;
  App.IMPLEMENTED_INTERFACES = opts.interfaces ?? ["Z2UI5_IF_APP", "IF_SERIALIZABLE_OBJECT"];
  App.METHODS = {};
  App.ATTRIBUTES = {};
  new App();                                     // fills ATTRIBUTES before first use
  abap.Classes[INTERNAL] = App;
  return App;
}

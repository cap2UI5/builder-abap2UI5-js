const { transpileClass } = require("../scripts/abap2js");

/** run the generated code with this test's require (self-refs via jest mapper) */
function loadGenerated(code) {
  const m = { exports: {} };
  new Function("require", "module", "exports", code)(require, m, m.exports);
  return m.exports;
}

// A partial `VALUE #( )` inserted/appended into a typed table must carry the
// row type's unmentioned components as their INITIAL value (0 for numeric,
// `` for string), the same way ABAP does. Otherwise the JS field is
// `undefined`, which poisons later arithmetic into NaN and makes comparisons
// like `n > row-num` always false — the root cause of the
// "NaN.NaNem" width crash in z2ui5_cl_sample_app_001.
describe("abap2js — VALUE #( ) completes typed-table rows with INITIAL defaults", () => {
  const abap = `
CLASS zcl_widths DEFINITION PUBLIC.
  PUBLIC SECTION.
    METHODS run
      RETURNING VALUE(result) TYPE i.
  PROTECTED SECTION.
    TYPES:
      BEGIN OF ty_s_block,
        base  TYPE string,
        width TYPE i,
      END OF ty_s_block.
    TYPES ty_t_block TYPE STANDARD TABLE OF ty_s_block WITH DEFAULT KEY.
    METHODS build
      RETURNING VALUE(result) TYPE ty_t_block.
ENDCLASS.

CLASS zcl_widths IMPLEMENTATION.
  METHOD build.
    DATA items TYPE STANDARD TABLE OF string WITH DEFAULT KEY.
    APPEND \`aa\` TO items.
    APPEND \`aaaa\` TO items.
    APPEND \`aa\` TO items.
    LOOP AT items INTO DATA(item).
      READ TABLE result ASSIGNING FIELD-SYMBOL(<block>)
        WITH KEY base = item.
      IF sy-subrc <> 0.
        INSERT VALUE #( base = item ) INTO TABLE result ASSIGNING <block>.
      ENDIF.
      DATA(len) = strlen( item ).
      IF len > <block>-width.
        <block>-width = len.
      ENDIF.
    ENDLOOP.
  ENDMETHOD.

  METHOD run.
    DATA(blocks) = build( ).
    LOOP AT blocks INTO DATA(block).
      result = result + block-width.
    ENDLOOP.
  ENDMETHOD.
ENDCLASS.
`;

  let out;
  beforeAll(() => {
    out = transpileClass(abap, "zcl_widths.clas.abap");
  });

  test("the inserted row literal initialises the numeric component to 0", () => {
    expect(out.code).toMatch(/\bwidth:\s*0\b/);
  });

  test("width accumulates correctly (no NaN, comparison actually fires)", () => {
    const Cls = loadGenerated(out.code);
    // one block "aa" (width 2) and one block "aaaa" (width 4) → 6
    expect(new Cls().run()).toBe(6);
  });
});

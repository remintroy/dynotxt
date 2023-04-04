import { createError } from ".";

describe("Utils", () => {
  //
  it("CreateError Normal case", () => {
    expect(createError(201, "Sample Error")).toEqual({
      code: 201,
      message: "Created",
      error: "Sample Error",
    });
  });

  it("CreateError Unexpected input", () => {
    const notExpectedInput: any = "asd";
    expect(createError(notExpectedInput, "")).toEqual({
      code: 500,
      message: "Internal Server Error",
      error: "Oops thats an error",
    });
  });
});

import { inputValidator } from "./validator";

describe("Validator", () => {
  // --- NAME ---
  it("Name Valid", async () => {
    const data = await inputValidator({ name: "test" });
    expect(data.name).toBe("test");
  });

  it("Name Empty", async () => {
    await expect(inputValidator({ name: "" })).resolves.toEqual({
      email: null,
      name: null,
      password: null,
      phone: null,
      photoURL: null,
    });
  });

  it("Name short", async () => {
    await expect(inputValidator({ name: "a" })).rejects.toEqual({
      code: 400,
      error: "Invalid name",
      message: "Bad Request",
    });
  });

  it("Name required", async () => {
    await expect(inputValidator({}, { name: true })).rejects.toEqual({
      code: 400,
      error: "Name is Required",
      message: "Bad Request",
    });
  });

  it("Name Unexpected", async () => {
    const unexpectedInput: any = 44;
    await expect(inputValidator({ name: unexpectedInput })).rejects.toEqual({
      code: 400,
      error: "Invalid name",
      message: "Bad Request",
    });
  });

  // --- PHONE ---
  it("phone Valid", async () => {
    const data = await inputValidator({ phone: "9423414132" });
    expect(data.phone).toBe("9423414132");
  });

  it("phone Empty", async () => {
    await expect(inputValidator({ phone: "" })).resolves.toEqual({
      email: null,
      name: null,
      password: null,
      phone: null,
      photoURL: null,
    });
  });

  it("phone required", async () => {
    await expect(inputValidator({}, { phone: true })).rejects.toEqual({
      code: 400,
      error: "Phone is Required",
      message: "Bad Request",
    });
  });

  it("phone invalid", async () => {
    await expect(inputValidator({ phone: "879374593275" }, { phone: true })).rejects.toEqual({
      code: 400,
      error: "Phone number is Invalid",
      message: "Bad Request",
    });
  });

  it("phone small length", async () => {
    await expect(inputValidator({ phone: "454545" })).rejects.toEqual({
      code: 400,
      error: "Phone number is Invalid",
      message: "Bad Request",
    });
  });

  it("phone Unexpected", async () => {
    const unexpectedInput: any = 44;
    await expect(inputValidator({ phone: unexpectedInput })).rejects.toEqual({
      code: 400,
      error: "Invalid phone",
      message: "Bad Request",
    });
  });

  // --- Email ---
  it("email Valid", async () => {
    const data = await inputValidator({ email: "test@abc.com" });
    expect(data.email).toBe("test@abc.com");
  });

  it("email Empty", async () => {
    await expect(inputValidator({ email: "" })).resolves.toEqual({
      email: null,
      name: null,
      password: null,
      phone: null,
      photoURL: null,
    });
  });

  it("email required", async () => {
    await expect(inputValidator({}, { email: true })).rejects.toEqual({
      code: 400,
      error: "Email is Required",
      message: "Bad Request",
    });
  });

  it("email Unexpected", async () => {
    const unexpectedInput: any = "sample";
    await expect(inputValidator({ email: unexpectedInput })).rejects.toEqual({
      code: 400,
      error: "Invalid email",
      message: "Bad Request",
    });
  });

  // --- password ---
  it("password Valid", async () => {
    const data = await inputValidator({ password: "strongpassword" });
    expect(data.password).toBe("strongpassword");
  });

  it("password Empty", async () => {
    await expect(inputValidator({ password: "" })).resolves.toEqual({
      email: null,
      name: null,
      password: null,
      phone: null,
      photoURL: null,
    });
  });

  it("password Empty with required", async () => {
    await expect(inputValidator({ password: "" }, { password: true })).rejects.toEqual({
      code: 400,
      error: "Password is Required",
      message: "Bad Request",
    });
  });

  it("password invalid input", async () => {
    const unexpectedInput: any = 4434;
    await expect(inputValidator({ password: unexpectedInput })).rejects.toEqual({
      code: 400,
      error: "Password must be a string",
      message: "Bad Request",
    });
  });

  it("password required", async () => {
    await expect(inputValidator({}, { password: true })).rejects.toEqual({
      code: 400,
      error: "Password is Required",
      message: "Bad Request",
    });
  });

  it("password Short", async () => {
    await expect(inputValidator({ password: "sampl" })).rejects.toEqual({
      code: 400,
      error: "Password must be at least 6 characters",
      message: "Bad Request",
    });
  });

  // --- PHOTO_URL ---
  it("PhotoURL Valid", async () => {
    const data = await inputValidator({ photoURL: "https://path.to/photo" });
    expect(data.photoURL).toBe("https://path.to/photo");
  });

  it("PhotoURL Empty", async () => {
    await expect(inputValidator({ photoURL: "" })).resolves.toEqual({
      email: null,
      name: null,
      password: null,
      phone: null,
      photoURL: null,
    });
  });

  it("PhotoURL Invalid", async () => {
    await expect(inputValidator({ photoURL: "sampl" })).rejects.toEqual({
      code: 400,
      error: "Invalid photoURL",
      message: "Bad Request",
    });
  });

  it("PhotoURL required", async () => {
    await expect(inputValidator({}, { photoURL: true })).rejects.toEqual({
      code: 400,
      error: "PhotoURL is Required",
      message: "Bad Request",
    });
  });

  it("PhotoURL Unexpected", async () => {
    const unexpectedInput: any = 88;
    await expect(inputValidator({ photoURL: unexpectedInput })).rejects.toEqual({
      code: 400,
      error: "Invalid photoURL",
      message: "Bad Request",
    });
  });
});

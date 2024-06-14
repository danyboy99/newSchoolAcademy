import Result from "../model/result";

export const createResult = async (
  studentRegNumber: string,
  classResult: string,
  term: string,
  result: any
) => {
  try {
    let newResult = new Result();
    newResult.studentRegNumber = studentRegNumber;
    newResult.classResult = classResult;
    newResult.termResult = term;
    newResult.result = result;

    await newResult.save();

    return newResult;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updateResult = async (
  studentRegNumber: string,
  classResult: string,
  term: string,
  result: any
) => {
  try {
    const foundResult = await Result.findOne({
      studentRegNumber: studentRegNumber,
      classResult: classResult,
      termResult: term,
    });
    if (!foundResult) {
      throw new Error("no result found with this cridentials");
    }

    foundResult.result = result;

    foundResult.save().then((data) => {
      return data;
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const checkResult = async (
  regnumber: string,
  classResult: string,
  termResult?: string
) => {
  try {
    const foundResult = await Result.findOne({
      studentRegNumber: regnumber,
      classResult,
      termResult: termResult,
    });
    return foundResult;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const checkResults = async (regnumber: string) => {
  try {
    const foundResult = await Result.find({
      studentRegNumber: regnumber,
    });
    return foundResult;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

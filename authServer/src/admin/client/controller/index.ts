import { Response } from "express";
import { RequestDefention } from "../../defenition";
import { disableUserWithUid, enableUserWithUid, getUsersDataInPages } from "../auth";

export const getAllUsersData = async (req: RequestDefention, res: Response) => {
  try {
    const page = Number(req.query?.page) || 1;
    const data = await getUsersDataInPages(page);
    res.send(data);
  } catch (error) {
    res.status(error?.code ? error.code : 500).send(error);
  }
};

export const disableUser = async (req: RequestDefention, res: Response) => {
  try {
    const uid = req.params?.uid;
    const data = await disableUserWithUid(uid);
    res.send(data);
  } catch (error) {
    res.status(error?.code ? error.code : 500).send(error);
  }
};

export const enableUser = async (req: RequestDefention, res: Response) => {
  try {
    const uid = req.params?.uid;
    const data = await enableUserWithUid(uid);
    res.send(data);
  } catch (error) {
    res.status(error?.code ? error.code : 500).send(error);
  }
};

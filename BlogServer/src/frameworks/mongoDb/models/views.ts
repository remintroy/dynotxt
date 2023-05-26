import { model } from "mongoose";
import viewsSchema from "./views.schema";

const ViewsModel = model<viewsSchema>("views", viewsSchema);

export default ViewsModel;

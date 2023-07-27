import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  write: String,
  title: String,
  contents: String,
});
console.log(boardSchema);
export const Board = mongoose.model("Board", boardSchema);

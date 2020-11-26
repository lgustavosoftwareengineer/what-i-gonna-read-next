import { NextFunction, Request, Response } from "express";

export default function checkSession(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization;
}

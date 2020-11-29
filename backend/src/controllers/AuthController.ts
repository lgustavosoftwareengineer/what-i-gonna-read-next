import { Request, Response } from "express";
import { getRepository } from "typeorm";
import dump from "../tools/dump";
import User from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import authConfigs from "../config/auth";

export default {
  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    try {
      const userRepository = getRepository(User);

      const user = await userRepository.findOneOrFail({ where: { email } });

      if (user) {
        const passwordIsEqual = await bcrypt.compare(password, user.password);
        if (passwordIsEqual) {
          const token = jwt.sign(
            { userId: user.id, username: user.name },
            authConfigs.jwt.jwtSecret,
            { expiresIn: authConfigs.jwt.expiresIn }
          );

          response.set("x-auth-token", [`Bearer ${token}`]);

          return dump({
            codeParam: 201,
            jsonParam: {},
            response,
          });
        } else {
          return dump({
            codeParam: 401,
            jsonParam: {},
            response,
          });
        }
      } else {
        return dump({
          codeParam: 404,
          jsonParam: {},
          response,
        });
      }
    } catch (err) {
      console.log(err.message);
      return dump({
        codeParam: 400,
        jsonParam: { error: true },
        response,
      });
    }
  },

  async registry(request: Request, response: Response) {
    const { email, password, name } = request.body;
    try {
      const userRepository = getRepository(User);

      const hashedPassword = bcrypt.hashSync(password, 10);

      const data = {
        email,
        password: hashedPassword,
        name,
      };

      const user = userRepository.create(data);

      await userRepository.save(user);

      return dump({
        codeParam: 201,
        jsonParam: {},
        response,
      });
    } catch (err) {
      console.log(err.message);
      return dump({
        codeParam: 400,
        jsonParam: { error: true },
        response,
      });
    }
  },
};

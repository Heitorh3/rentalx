import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const email = request.body;

    return null;
  }
}
export default new ForgotPasswordController();

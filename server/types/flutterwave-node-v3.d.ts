declare module "flutterwave-node-v3" {
  interface ChargeResponse {
    status: string;
    data: any;
    meta: {
      authorization: {
        mode: string;
      };
    };
  }

  interface ValidateResponse {
    status: string;
    data: any;
  }

  interface Flutterwave {
    charge: {
      card(payload: any): Promise<ChargeResponse>;
      validate(payload: any): Promise<ValidateResponse>;
    };
  }

  const Flutterwave: {
    new (publicKey: string, secretKey: string): Flutterwave;
  };

  export = Flutterwave;
}

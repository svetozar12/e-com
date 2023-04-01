import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path = require('path');

export interface IGrpcConfigurations {
  port: number;
}

export abstract class GrpcClient {
  private defaultClientOptions: protoLoader.Options = {
    enums: String,
    longs: String,
    oneofs: true,
    defaults: true,
  };

  /**
   * Load package definition
   * @param {protoPath} protoPath path to proto file
   * @param {protoLoader.Options} options optional
   * @returns {GrpcObject} package definition
   */
  protected initPackageDefinition<T>(
    protoPath: string,
    options?: protoLoader.Options
  ): T {
    const packageDef: protoLoader.PackageDefinition = protoLoader.loadSync(
      protoPath,
      options || this.defaultClientOptions
    );
    return grpc.loadPackageDefinition(packageDef) as T;
  }

  /**
   * Build proto file path
   * @param {string} protoPath
   * @param {string} fileName
   * @returns {string}
   */
  protected buildProtoPath(protoPath: string, fileName: string): string {
    return path.join(protoPath, fileName);
  }

  /**
   * Build client credentials
   * @param {IGrpcConfigurations} configs
   * @returns {grpc.ChannelCredentials}
   */
  protected buildCredentials(): grpc.ChannelCredentials {
    return grpc.credentials.createInsecure();
  }
}

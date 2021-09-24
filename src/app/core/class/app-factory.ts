import { EnvironmentLoaderService } from '../service/environment-loader.service';

export function LoadEnvironmentFactory(
    environmentLoader: EnvironmentLoaderService
) {
    return () => environmentLoader.load()
}
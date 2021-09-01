// TODO Use a better logging approach(maybe use morgan)
export class Logger {
    static info(message: string) {
        console.log(message);
    }

    static error(error: any) {
        console.error(error);
    }
}

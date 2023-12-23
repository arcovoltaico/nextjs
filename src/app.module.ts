import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {WordModule} from './word/word.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import config from "../orm.config";

@Module({
    imports: [TypeOrmModule.forRoot(config), WordModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

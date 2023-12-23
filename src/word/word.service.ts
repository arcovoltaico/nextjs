import {Injectable} from '@nestjs/common';
import {CreateWordDto} from './dto/create-word.dto';
import {UpdateWordDto} from './dto/update-word.dto';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Word} from "./entities/word.entity";

@Injectable()
export class WordService {
    constructor(@InjectRepository(Word) private wordsRepository: Repository<Word>) {
    }

    async create(word: CreateWordDto): Promise<Word> {
        return await this.wordsRepository.save(word);
    }

    async findAll(): Promise<Word[]> {
        return await this.wordsRepository.find();
    }

    async findOne(id: number): Promise<Word[]> {
        return await this.wordsRepository.find({
            select: ["id", "name", "language"], where: [{"id": id}]
        });
    }

    async update(id: number, word: UpdateWordDto): Promise<any> {
        return await this.wordsRepository.update(id, word);
    }

    async remove(id: number): Promise<any> {
        return await this.wordsRepository.delete(id);
    }
}

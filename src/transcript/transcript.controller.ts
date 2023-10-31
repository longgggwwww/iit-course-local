import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { UpsertTranscriptDto } from './dto/update-transcript.dto';
import { FindTranscriptDto } from './dto/find-transcript.dto';
import { DeleteTranscriptDto } from './dto/delete-transcript.dto';

@Controller('transcripts')
export class TranscriptController {
  constructor(private readonly transcriptService: TranscriptService) {}
  @Get()
  findAll(@Query() findTranscriptDto: FindTranscriptDto) {
    return this.transcriptService.findAll(findTranscriptDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transcriptService.findUniq({
      id: +id,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() upsertTranscriptDto: UpsertTranscriptDto,
  ) {
    return this.transcriptService.update({
      where: {
        id: +id,
      },
      dataUpdateInput: upsertTranscriptDto.update,
      dataCreateInput: upsertTranscriptDto.create,
    });
  }

  @Delete('batch')
  removeMany(@Body() deleteTranscriptDto: DeleteTranscriptDto) {
    return this.transcriptService.removeMany({
      id: {
        in: deleteTranscriptDto.ids,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transcriptService.remove({
      id: +id,
    });
  }
}

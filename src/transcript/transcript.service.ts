import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TranscriptService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TranscriptWhereUniqueInput;
    where?: Prisma.TranscriptWhereInput;
    orderBy?: Prisma.TranscriptOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.transcript.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        class: {
          include: {
            grade: true,
            year: true,
          },
        },
        subject: true,
        student: true,
      },
    });
  }

  async findUniq(where: Prisma.TranscriptWhereUniqueInput) {
    return this.prisma.transcript.findUniqueOrThrow({
      where,
      include: {
        class: {
          include: {
            grade: true,
            year: true,
          },
        },
        subject: true,
        student: true,
      },
    });
  }

  async update(params: {
    where: Prisma.TranscriptWhereUniqueInput;
    dataUpdateInput: Prisma.TranscriptUpdateInput;
    dataCreateInput: Prisma.TranscriptCreateInput;
  }) {
    const { where, dataCreateInput, dataUpdateInput } = params;
    return this.prisma.transcript.upsert({
      update: dataUpdateInput,
      create: dataCreateInput,
      where,
      include: {
        class: {
          include: {
            grade: true,
            year: true,
          },
        },
        subject: true,
        student: true,
      },
    });
  }

  async removeMany(where: Prisma.TranscriptWhereInput) {
    return this.prisma.transcript.deleteMany({
      where,
    });
  }

  async remove(where: Prisma.TranscriptWhereUniqueInput) {
    return this.prisma.transcript.delete({
      where,
      include: {
        class: {
          include: {
            grade: true,
            year: true,
          },
        },
        subject: true,
        student: true,
      },
    });
  }
}

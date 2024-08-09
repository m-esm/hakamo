import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DatasourceDto } from './datasource.dto';
import { DatasourceService } from './datasource.service';

@Controller('datasources')
@ApiTags('Datasources')
export class DatasourceController {
  constructor(private readonly datasourceService: DatasourceService) {}

  @Get('/')
  @ApiOperation({
    operationId: 'getDatasources',
    summary: 'Get all saved datasource connections',
  })
  @ApiResponse({
    status: 200,
    description: 'List of saved datasource connections',
    type: [DatasourceDto],
  })
  getDatasources(): Promise<DatasourceDto[]> {
    return this.datasourceService.getDatasources();
  }

  @Get('/:datasourceId')
  @ApiOperation({
    operationId: 'getDatasource',
    summary: 'Get a specific saved datasource connection',
  })
  @ApiResponse({
    status: 200,
    description: 'The saved datasource connection',
    type: DatasourceDto,
  })
  getDatasource(
    @Param('datasourceId') datasourceId: string,
  ): Promise<DatasourceDto> {
    return this.datasourceService.getDatasource(datasourceId);
  }

  @Post('/')
  @ApiOperation({
    operationId: 'createDatasource',
    summary: 'Create a new datasource connection',
  })
  @ApiBody({ type: DatasourceDto })
  @ApiResponse({
    status: 201,
    description: 'The created datasource connection',
    type: DatasourceDto,
  })
  createDatasource(
    @Body() datasourceDto: DatasourceDto,
  ): Promise<DatasourceDto> {
    return this.datasourceService.createDatasource(datasourceDto);
  }

  @Put('/:datasourceId')
  @ApiOperation({
    operationId: 'updateDatasource',
    summary: 'Update a datasource connection',
  })
  @ApiBody({ type: DatasourceDto })
  @ApiResponse({
    status: 200,
    description: 'The updated datasource connection',
    type: DatasourceDto,
  })
  updateDatasource(
    @Param('datasourceId') datasourceId: string,
    @Body() datasourceDto: DatasourceDto,
  ): Promise<DatasourceDto> {
    return this.datasourceService.updateDatasource(datasourceId, datasourceDto);
  }

  @Delete('/:datasourceId')
  @ApiOperation({
    operationId: 'deleteDatasource',
    summary: 'Delete a datasource connection',
  })
  @ApiResponse({
    status: 200,
    description: 'The deleted datasource connection',
  })
  deleteDatasource(@Param('datasourceId') datasourceId: string): Promise<void> {
    return this.datasourceService.deleteDatasource(datasourceId);
  }
}

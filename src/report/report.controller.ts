import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('competences/:jobOfferId')
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Competencias del candidato conectado', description: 'Devuelve el valor de las competencias del candidato conectado en la oferta jobOfferId' })
  getCandidateCompetenceReport(@Param('jobOfferId') jobOfferId: string,  @Req() request: Request): any  {    
    
    const competences = 
    [
      { name: "competence1", value: 10 },
      { name: "competence2", value: 20 },
      { name: "competence3", value: 9 },
      { name: "competence4", value: 51 },
      { name: "competence5", value: 15 },
      { name: "competence6", value: 26 },
      { name: "competence7", value: 90 },
    ];
    return competences;
  }

  @Get('candidates/:jobOfferId/:candidateId')
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Competencias del candidato de una oferta', description: 'Devuelve el valor de las competencias del candidato de una oferta del CLIENTE conectado' })
  getClientCandidateCompetenceReport(@Param('jobOfferId') jobOfferId: string, @Param('candidateId') candidateId: string, @Req() request: Request): any {    
    
    const competences = 
    [
      { name: "competence1", value: 10 },
      { name: "competence2", value: 20 },
      { name: "competence3", value: 9 },
      { name: "competence4", value: 51 },
      { name: "competence5", value: 15 },
      { name: "competence6", value: 26 },
      { name: "competence7", value: 90 },
    ];
    return {
      "jobOfferName": "Oferta Developer",
      "candidateName": "Juan Perez",
      competences
    }
  }

  @Get('jobOffers/:jobOfferId')  
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Competencias de todos los candidatos apuntados a una oferta', description: 'Devuelve el valor de las competencias de TODOS los candidatos de una oferta del CLIENTE conectado' })
  getReport(@Param('jobOfferId') jobOfferId: string,  @Req() request: Request): { [key: string]: any } {    
    const competences1 = 
    [
      { name: "competence1", value: 10 },
      { name: "competence2", value: 20 },
      { name: "competence3", value: 9 },
      { name: "competence4", value: 51 },
      { name: "competence5", value: 15 },
      { name: "competence6", value: 26 },
      { name: "competence7", value: 90 },
      { name: "competence8", value: 34 },
      { name: "competence9", value: 15 },
    ];

    const competences2 = 
    [
      { name: "competence1", value: 71 },
      { name: "competence2", value: 22 },
      { name: "competence3", value: 20 },
      { name: "competence4", value: 67 },
      { name: "competence5", value: 70 },
      { name: "competence6", value: 20 },
      { name: "competence7", value: 62 },
      { name: "competence8", value: 9 },
      { name: "competence9", value: 35 },
    ];

    const competences3 = 
    [
      { name: "competence1", value: 87 },
      { name: "competence2", value: 42 },
      { name: "competence3", value: 21 },
      { name: "competence4", value: 6 },
      { name: "competence5", value: 0 },
      { name: "competence6", value: 10 },
      { name: "competence7", value: 42 },
      { name: "competence8", value: 91 },
      { name: "competence9", value: 30 },
    ];


    return [
      {
        name: 'Juan',
        surname: 'Perez',
        email: 'a@e.s',
        phoneNumber: '123123123',
        competences: competences1,
      },
      {
        name: 'Manu',
        surname: 'Ruiz',
        email: 'abasd@ese.s',
        phoneNumber: '123123123',
        competences: competences2,
      }, {
        name: 'Angel',
        surname: 'Rodriguez',
        email: 'best@es.be',
        phoneNumber: '123123123',
        competences: competences3,
      },{
        name: 'Luis',
        surname: 'Rodriguez',
        email: 'best@es.be',
        phoneNumber: '123123123',
        competences: competences2,
      },{
        name: "User834",
        surname: "LastName123",
        email: "user834.lastname123@example.com",
        phoneNumber: "358745883",
        competences: competences3
      },
      {
        name: "User854",
        surname: "LastName705",
        email: "user854.lastname705@example.com",
        phoneNumber: "131417220",
        competences: competences2
      },
      {
        name: "User809",
        surname: "LastName487",
        email: "user809.lastname487@example.com",
        phoneNumber: "141061041",
        competences: competences1
      },
      {
        name: "User3",
        surname: "LastName984",
        email: "user3.lastname984@example.com",
        phoneNumber: "789423236",
        competences: competences2
      },
      {
        name: "User782",
        surname: "LastName859",
        email: "user782.lastname859@example.com",
        phoneNumber: "513753937",
        competences: competences1
      }
    ]
  }

  @Get('clientActivity/:year')
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Estadísticas de uso de la plataforma de los clientes de un año', description: 'Devuelve las estadísticas del uso de la plataforma por los clientes en un año (usado por el ADMIN)' })
  getClientActivity(@Param('year') year: string,  @Req() request: Request): { [key: string]: any } {    
    const statistics1 = 
    [
      { name: "numberOfJobOffers", value: 10 },
      { name: "month", value: 20 },
      { name: "numberOfSessions", value: 9 },
      { name: "numberOfCandidates", value: 51 },
    ];

    const statistics2 = 
    [
      { name: "numberOfJobOffers", value: 2 },
      { name: "month", value: 4 },
      { name: "numberOfSessions", value: 8 },
      { name: "numberOfCandidates", value: 10 },
    ];

    const statistics3 = 
    [
      { name: "numberOfJobOffers", value: 5 },
      { name: "month", value: 4 },
      { name: "numberOfSessions", value: 18 },
      { name: "numberOfCandidates", value: 50 },
    ];

    return [
      {
      companyName: "Company 5",      
      statistics: statistics1      
      },
      {
      companyName: "Company 8",
      statistics: statistics2      
      },
      {
      companyName: "Company 10",
      statistics: statistics3      
      },
      {
      companyName: "Company 4",
      statistics: statistics3
      },
      {
      companyName: "Company 10",
      statistics: statistics2
      },
      {
      companyName: "Company 5",
      statistics: statistics1
      },
      {
      companyName: "Company 6",
      statistics: statistics1
      },
      {
      companyName: "Company 7",
      statistics: statistics2
      },
      {
      companyName: "Company 8",
      statistics: statistics1
      },
      {
      companyName: "Company 6",
      statistics: statistics1
      }
    ]    
   }
      
}
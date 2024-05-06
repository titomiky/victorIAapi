import { Controller, Get, Param, Req } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/auth/auth.controller';

@ApiTags('reports')
@Controller('competences')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('jobOffer/:jobOfferId')
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Competencias del candidato conectado', description: 'Devuelve el valor de las competencias del candidato conectado' })
  getCandidateCompetenceReport(@Param('jobOfferId') jobOfferId: string,  @Req() request: Request): { [key: string]: number } {
    console.log('123')
    return {
      competence1: 10,
      competence2: 20,
      competence3: 9,
      competence4: 51,
      competence5: 15,
      competence6: 26,
      competence7: 90,      
    };
  }

  @Get('candidates/:jobOfferId/:candidateId')
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Competencias del candidato de una oferta', description: 'Devuelve el valor de las competencias del candidato de una oferta del CLIENTE conectado' })
  getClientCandidateCompetenceReport(@Param('jobOfferId') jobOfferId: string, @Param('candidateId') candidateId: string, @Req() request: Request): { [key: string]: number } {
    console.log('todos12')
    return {
      competence1: 10,
      competence2: 20,
      competence3: 9,
      competence4: 51,
      competence5: 15,
      competence6: 26,
      competence7: 90,      
    };
  }

  @Get('joboffers/:jobOfferId')  
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Competencias de todos los candidatos apuntados a una oferta', description: 'Devuelve el valor de las competencias de TODOS los candidatos de una oferta del CLIENTE conectado' })
  getReport(@Param('jobOfferId') jobOfferId: string,  @Req() request: Request): { [key: string]: any } {
    console.log('todos')
    return [
      {
        name: 'Juan',
        surname: 'Perez',
        email: 'a@e.s',
        phoneNumber: '123123123',
        competences: {
          competencia1: 71,
          competencia2: 22,
          competencia3: 20,
          competencia4: 67,
          competencia5: 20,
          competencia6: 70,
          competencia7: 20,
          competencia8: 62,
          competencia9: 9,
          competencia10: 35
        },
      },
      {
        name: 'Manu',
        surname: 'Ruiz',
        email: 'abasd@ese.s',
        phoneNumber: '123123123',
        competences: {
          competencia1: 71,
          competencia2: 22,
          competencia3: 20,
          competencia4: 67,
          competencia5: 20,
          competencia6: 70,
          competencia7: 20,
          competencia8: 62,
          competencia9: 9,
          competencia10: 35
        },
      }, {
        name: 'Angel',
        surname: 'Rodriguez',
        email: 'best@es.be',
        phoneNumber: '123123123',
        competences: {
          competencia1: 87,
          competencia2: 42,
          competencia3: 68,
          competencia4: 53,
          competencia5: 63,
          competencia6: 69,
          competencia7: 60,
          competencia8: 1,
          competencia9: 35,
          competencia10: 90
        },
      },{
        name: 'Luis',
        surname: 'Rodriguez',
        email: 'best@es.be',
        phoneNumber: '123123123',
        competences: {
          competencia1: 48,
          competencia2: 19,
          competencia3: 9,
          competencia4: 23,
          competencia5: 38,
          competencia6: 65,
          competencia7: 37,
          competencia8: 27,
          competencia9: 26,
          competencia10: 26
        },
      },{
        name: "User834",
        surname: "LastName123",
        email: "user834.lastname123@example.com",
        phoneNumber: "358745883",
        competences: {
          competencia1: 48,
          competencia2: 19,
          competencia3: 9,
          competencia4: 23,
          competencia5: 38,
          competencia6: 65,
          competencia7: 37,
          competencia8: 27,
          competencia9: 26,
          competencia10: 26
        }
      },
      {
        name: "User854",
        surname: "LastName705",
        email: "user854.lastname705@example.com",
        phoneNumber: "131417220",
        competences: {
          competencia1: 25,
          competencia2: 35,
          competencia3: 47,
          competencia4: 63,
          competencia5: 48,
          competencia6: 86,
          competencia7: 52,
          competencia8: 53,
          competencia9: 34,
          competencia10: 79
        }
      },
      {
        name: "User809",
        surname: "LastName487",
        email: "user809.lastname487@example.com",
        phoneNumber: "141061041",
        competences: {
          competencia1: 87,
          competencia2: 42,
          competencia3: 68,
          competencia4: 53,
          competencia5: 63,
          competencia6: 69,
          competencia7: 60,
          competencia8: 1,
          competencia9: 35,
          competencia10: 90
        }
      },
      {
        name: "User3",
        surname: "LastName984",
        email: "user3.lastname984@example.com",
        phoneNumber: "789423236",
        competences: {
          competencia1: 33,
          competencia2: 53,
          competencia3: 59,
          competencia4: 27,
          competencia5: 12,
          competencia6: 26,
          competencia7: 38,
          competencia8: 20,
          competencia9: 29,
          competencia10: 41
        }
      },
      {
        name: "User782",
        surname: "LastName859",
        email: "user782.lastname859@example.com",
        phoneNumber: "513753937",
        competences: {
          competencia1: 71,
          competencia2: 22,
          competencia3: 20,
          competencia4: 67,
          competencia5: 20,
          competencia6: 70,
          competencia7: 20,
          competencia8: 62,
          competencia9: 9,
          competencia10: 35
        }
      }
    ]
  }

  @Get('clientActivity/:year')
  @ApiBearerAuth()  
  @ApiOperation({ summary: 'Estadísticas de uso de la plataforma de los clientes de un año', description: 'Devuelve las estadísticas del uso de la plataforma por los clientes en un año (usado por el ADMIN)' })
  getClientActivity(@Param('year') year: string,  @Req() request: Request): { [key: string]: any } {
    console.log('todos456');
    return [
      {
      companyName: "Company 5",
      numberOfJobOffers: 2,
      month: 4,
      numberOfSessions: 8,
      numberOfCandidates: 10
      },
      {
      companyName: "Company 8",
      numberOfJobOffers: 7,
      month: 4,
      numberOfSessions: 7,
      numberOfCandidates: 87
      },
      {
      companyName: "Company 10",
      numberOfJobOffers: 9,
      month: 7,
      numberOfSessions: 8,
      numberOfCandidates: 43
      },
      {
      companyName: "Company 4",
      numberOfJobOffers: 9,
      month: 8,
      numberOfSessions: 9,
      numberOfCandidates: 84
      },
      {
      companyName: "Company 10",
      numberOfJobOffers: 8,
      month: 8,
      numberOfSessions: 9,
      numberOfCandidates: 11
      },
      {
      companyName: "Company 5",
      numberOfJobOffers: 3,
      month: 12,
      numberOfSessions: 3,
      numberOfCandidates: 79
      },
      {
      companyName: "Company 6",
      numberOfJobOffers: 1,
      month: 3,
      numberOfSessions: 10,
      numberOfCandidates: 70
      },
      {
      companyName: "Company 7",
      numberOfJobOffers: 6,
      month: 12,
      numberOfSessions: 4,
      numberOfCandidates: 84
      },
      {
      companyName: "Company 8",
      numberOfJobOffers: 3,
      month: 12,
      numberOfSessions: 9,
      numberOfCandidates: 53
      },
      {
      companyName: "Company 6",
      numberOfJobOffers: 3,
      month: 3,
      numberOfSessions: 3,
      numberOfCandidates: 81
      }
    ]    
   }
      
}
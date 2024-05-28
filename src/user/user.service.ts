import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
const { ObjectId } = mongoose.Types;  

import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JobOfferDto } from './dtos/jobOffer.dto';
import { JobOffer } from './schemas/jobOffer.schema';
import { Competence } from '../competence/schemas/competence.schema';
import { SessionService } from '../session/session.service';
import { link } from 'fs';
import { Readable } from 'stream';
import * as Grid from 'gridfs-stream';
import { FilesManagerService } from 'src/files-manager/files-manager.service';
import * as ejs from 'ejs'; 
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {
  
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Competence.name) private competenceModel: Model<Competence>, private jwtService: JwtService, private sessionService: SessionService, private fileManagerService: FilesManagerService) {}

  async create(user: UserDto) {
    user.password = await bcrypt.hash(user.password, 10);

    const createdUser = new this.userModel(user);
    return await createdUser.save();        
  }

  private removePassword( user) {
    const { password,...result } = user;
    return result;
  }

  async update(userId: string, user: UserDto) {
    const now = new Date();
    if (user.password.length>0) {
      user.password = await bcrypt.hash(user.password, 10);    
    }
    user.updatedAt = now;

    return await this.userModel
    .findOneAndUpdate({ _id: userId }, user, {
      new: true,
    }).select('-password')
      .exec();
  }

  async updateCandidate(candidateId: string, user: UserDto) {
    const now = new Date();
    if (user.password.length>0) {
      user.password = await bcrypt.hash(user.password, 10);    
    }
    user.updatedAt = now;

    return await this.userModel
    .findOneAndUpdate({ 'candidateUser._id': candidateId }, user, {
      new: true,
    }).select('-password')
      .exec();
  }

  async validateEmail(userId: string) {    
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, { emailValidatedDate: Date.now(), updatedAt: Date.now() }, {
        new: false,
      }).select('-password')
      .exec();
  }

  async createAdminUser(userId: string, user: UserDto) {
    try {
    console.log('kkk')  
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: true,
      }).select('-password')
      .exec();      
    } catch (error) {
      console.log(error)
    }
  }

  async createClientUser(userId: string, user: UserDto) {
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async createCandidateUser(userId: string, user: UserDto) {    
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: true,
      }).select('-password')
      .exec();
  }

  async updateCandidateUser(userId: string, user: UserDto) {    
    
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, user, {
        new: false,
      }).select('-password')
      .exec();
  }

  async updateJobOffer (userId: string, jobOfferId: string, jobOffer: JobOfferDto) {

    //TODO: pending
    const cliente = await this.userModel.findById(userId);

    // Si no se encuentra el cliente, lanzar un error
    if (!cliente) {      
      throw new Error('Cliente no encontrado');
    }
                
    let jobOfferIndex = -1;
    for (let i = 0; i < cliente.clientUser?.jobOffers?.length; i++) {
      const item = cliente.clientUser?.jobOffers[i];

      if (`${item._id}` === jobOfferId)
        jobOfferIndex = i;
    }             

   // Si no se encuentra la jobOffer, lanzar un error
   if (jobOfferIndex === -1) {      
      //throw new Error('Oferta de trabajo no encontrada');
    }
      // Actualizar la jobOffer en el array de jobOffers del cliente
      cliente.clientUser.jobOffers[jobOfferIndex].name  = jobOffer.name;
      cliente.clientUser.jobOffers[jobOfferIndex].description  = jobOffer.description;
      cliente.clientUser.jobOffers[jobOfferIndex].competenceIds  = jobOffer.competenceIds;
      cliente.clientUser.jobOffers[jobOfferIndex].candidateIds  = jobOffer.candidateIds;
      const now = new Date();      
      cliente.updatedAt = now;
      cliente.clientUser.updatedAt = now;

      // Guardar los cambios en la base de datos
      return await cliente.save();  
  }

  async getJobOffer (userId: string, jobOfferId: string) {

    //TODO: pending
    const cliente = await this.userModel.findById(userId);

    // Si no se encuentra el cliente, lanzar un error
    if (!cliente) {      
      throw new Error('Cliente no encontrado');
    }
                
    let jobOfferIndex = -1;
    for (let i = 0; i < cliente.clientUser?.jobOffers?.length; i++) {
      const item = cliente.clientUser?.jobOffers[i];    

      if (`${item._id}` === jobOfferId) {
        jobOfferIndex = i;
      }
    }
    return  cliente.clientUser?.jobOffers[jobOfferIndex];
    
  }

  async findAll() {
    return await this.userModel.find().select('-password').exec();
  }

  async findAllCandidates() {

    const projection = { "candidateUser._id": 1, "candidateUser.name": 1, "candidateUser.surname": 1, "email": 1 };

    // Find candidates with a candidateUser field
    const candidates = await this.userModel.find({ candidateUser: { $exists: true } } /*, projection*/);

    // Extract relevant data from candidates
    const candidateList = candidates.map(candidate => ({
      candidateUserId: candidate.candidateUser?._id,
      name: candidate.candidateUser.name,
      surname: candidate.candidateUser.surname,
      email: candidate.email,            
      currentSalary: candidate.candidateUser.currentSalary,
      desiredSalary: candidate.candidateUser.desiredSalary,      
      age: this.getAge(candidate.candidateUser.birthDate),
      cVpdfUrl: candidate.candidateUser.cvPdfUrl

    }));

    return candidateList;    
  }

  getAge (birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    
    let age = today.getFullYear() - birthDateObj.getFullYear();
    
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    // Ajustar la edad si el mes o el día del cumpleaños aún no ha ocurrido este año
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
  }

  async findAllJobOffers() {

    const users = await this.userModel.find({ 'clientUser': { $exists: true } });

    const jobOffers = [];
    for (const user of users) {
      for (const jobOffer of user.clientUser.jobOffers) {
        jobOffers.push({
          jobOfferId: jobOffer._id,
          name: jobOffer.name,
          description: jobOffer.description,
          numberOfCandidates: jobOffer.candidateIds.length,
        });
      }
    }

    return jobOffers;
  }


  async findAllJobOffersByClientId(clientUserId: string) {    
    const user = await this.userModel.findOne({ 'clientUser._id': clientUserId });

    if (!user) {      
     
      return null;
    }    
    
    const jobOffers = [];
    for (const jobOffer of user.clientUser.jobOffers) {
      jobOffers.push({
        _id: jobOffer._id,
        name: jobOffer.name,
        description: jobOffer.description,
        numCandidates: jobOffer.candidateIds.length,
      });
    }

    return jobOffers;
  }

  async findAllJobOffersByCandidateId(candidateId: string) {
    const users = await this.userModel.find({
      'clientUser.jobOffers.candidateIds': { $in: [candidateId] },
    });

    // Extract and format JobOffers data    
    const jobOffers = [];    
    for (const user of users) {
      for (const jobOffer of user.clientUser.jobOffers) {
        if (jobOffer.candidateIds.includes(candidateId)) {
        
          try {            
            jobOffer.competenceIds.forEach(id => {
              //console.log(id);
            });
            let competences = [];
            try {
              const competenceIds = jobOffer.competenceIds.map(id => new ObjectId(id.toString()));        
              competences = await this.competenceModel.find({ _id: { $in: competenceIds } }).select('name').exec();            
            }catch (error) {
              //console.log(error);
            }            
            const linkToSession = await this.sessionService.getSessionLink(candidateId, jobOffer._id.toString());

            jobOffers.push({
              _id: jobOffer._id,
              name: jobOffer.name,
              description: jobOffer.description,
              numCandidates: jobOffer.candidateIds.length,
              clientUserName: user.clientUser.name, // Add clientUser name
              competencesNames: competences.map(competence => competence.name),
              linkToSession: linkToSession
            });
          } catch(error) {
            console.log(error);
          }
        }
      }
    }

    return jobOffers
  }   

  async findAllCandidatesByJobOfferId(jobOfferId: string) {        
    try {

      console.log(jobOfferId)
      const users = await this.userModel.find();  //TODO: improve query, try to find the jobOffer with a mongo query...
      
      let candidateIds = [];
      for (const user of users) {
        if (user.clientUser?.jobOffers) {
          for (let i = 0; i < user.clientUser?.jobOffers?.length; i++) {
            const item = user.clientUser?.jobOffers[i];            

            if (`${item._id}` === jobOfferId) {
              //console.log(`${item._id}`)              
              candidateIds = user.clientUser?.jobOffers[i].candidateIds;
              break;
            }    
          }
        }
      }
      
      const candidates = await this.userModel.find({
        'candidateUser._id': { $in: candidateIds },
      });

      // Extract relevant data from candidates
      const candidateList = candidates.map(candidate => ({
        candidateUserId: candidate.candidateUser._id,      
        name: candidate.candidateUser.name,
        surname: candidate.candidateUser.surname,
        email: candidate.email,
        phoneNumber: candidate.candidateUser.phoneNumber,
        currentSalary: candidate.candidateUser.currentSalary,
        desiredSalary: candidate.candidateUser.desiredSalary,      
        age: this.getAge(candidate.candidateUser.birthDate),
        cVpdfUrl: candidate.candidateUser.cvPdfUrl
      }));

      return candidateList;    
    } catch(error) {      
      return [];
    }
      
  } 

  async findOne(id: string) {    
    return await this.userModel.findById(id).select('-password').exec();
  }

  async findClient(clientId: string) {    
    try {      
      const user = await this.userModel.findOne({ 'clientUser._id':  clientId}).exec();      
      return user;
    } catch (error) {
      console.log(error)
    }
  }

  async findCandidate(candidateId: string) {    
    try {            
      const user = await this.userModel.findOne({ 'candidateUser._id':  candidateId}).exec();      
      return user;
    } catch (error) {
      console.log(error)
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({email: email}).exec();
    //return this.userModel.find(user => user.email === email).exec();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id).select('-password').exec();
  }

  async deleteJobOffer(userId: string, jobOfferId: string) {
    const filter = { _id: new ObjectId(userId) };
    const update = { $pull: { "clientUser.jobOffers": { _id: new ObjectId(jobOfferId) } } };

    return await this.userModel.updateOne(filter, update).exec();    
  }
  
  async checkCandidateAssignedToJobOffer(candidateId, jobOfferId) {
    try {                 
      const candidates = await this.findAllCandidatesByJobOfferId(jobOfferId);
      const candidateIds = await candidates.map(candidate => candidate.candidateUserId.toString());      
  
      const result = candidateIds.includes(candidateId);              
      return result;
          
    } catch (error){
      return false;
    }
  }
 

  async checkIfCandidateIdsExist(ids: string[]) {
    try {      
      const objectIds = ids.map(id => new ObjectId(id));              

      // Buscar si todos los IDs existen en los subdocumentos candidateUser de User
      const count = await this.userModel.countDocuments({
        'candidateUser._id': { $in: objectIds }
      });

      return count === ids.length;     
    } catch(error) {
      console.log(error)
      return false;
    }
  }

  async setCvPdfFileUrlToCandidate(cvPdfUrl:  string, candidateId: string )
  {
    try {      
      console.log('candidateId', candidateId);
      const user = await this.userModel.findOne({ 'candidateUser._id':  candidateId}).exec();      
      console.log(user.candidateUser);
      user.candidateUser.cvPdfUrl = cvPdfUrl;
      console.log(user.candidateUser);
      return await user.save();
    }catch(error) {
      console.log(error);
    }
  }

  async sendEmailToVerifyAccount(userId:  string, email: string, currentURL: string)
  {
    try {  
      console.log(userId, email, currentURL);

      const config = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_AUTH_USER,
          pass: process.env.EMAIL_AUTH_PASS
        }
      };
      console.log('config', config);      
      const verificationLink = currentURL + "/validateEmailByToken/" + userId;      
      
      // Render the HTML email body using the EJS template
      const templatePath = __dirname.replace('user', 'views/validateEmail.ejs');      

      //const templateString = fs.readFileSync(templatePath, 'utf8');
      const templateData  = {
        email: email,
        verificationLink: verificationLink,
      };
      const html = await ejs.renderFile(templatePath, templateData)      

      // Define email options
      const message = {
        from: 'info@stoical.be',
        to: email,
        subject: 'Verificación de email',
        html: html,
        text: 'hola'
      };
    
      // Send the email
      try {
        const transport = await nodemailer.createTransport(config);
        const info = await transport.sendMail(message);                
        return HttpStatus.OK;
      } catch (error) {
        console.log('error', error);
        return HttpStatus.INTERNAL_SERVER_ERROR; 
      }      
    } catch (error) {            
      return HttpStatus.INTERNAL_SERVER_ERROR;    
    }

  }
} 
 
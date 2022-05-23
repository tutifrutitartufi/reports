import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { checkValidation } from './lib/validate-service.js';
import { getCountryFromIPAddress } from './lib/geolocalization-service.js'
import { writeSync, readSync, existsSync, appendSync } from './lib/file-service.js';
import { v4 as uuidv4 } from 'uuid';

import IReport from './interface/index.js';

dotenv.config();

const app: Express = express();

app.use(express.json());

const port = process.env.PORT;

app.get('/reports', (_, res: Response) => {
  let reportsResponse: string = readSync('./reports.txt');
  return res.send(JSON.parse(reportsResponse));
});

app.get('/reports/:id', (req: Request, res: Response) => {
  let reportsResponse: string = readSync('./reports.txt');
  let parsedReports: IReport[] = JSON.parse(reportsResponse);
  let foundReport: IReport = parsedReports.find((x: IReport) => x.id == req.params.id); 
  res.send(foundReport);
})

app.post('/reports', async (req: Request, res: Response) => {
  let ipAddress: string = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
  const { title, phone } = req.body;

  if (await checkValidation(title, phone)) {

    let report: IReport = {
      id: uuidv4(),
      title: req.body.title,
      phone: req.body.phone,
      country: await getCountryFromIPAddress(ipAddress)
    }

    if (existsSync('./reports.txt')) {
      appendSync('./reports.txt', JSON.stringify(report));
    } else {
      writeSync('./reports.txt', JSON.stringify([report])); 
    }
    res.send('Successfully');
  } else {
    res.send('Error with validation report');
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
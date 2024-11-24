import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import  { chromium } from "playwright";

async function bootstrap() {

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();


  await page.goto('https://www.opus.pro/');
  await page.waitForSelector('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
  await page.click('button#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')

  await page.waitForSelector('a#start-free-trial')
  await page.click('a#start-free-trial')
  await page.waitForURL("https://auth.opus.pro/login**")


  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

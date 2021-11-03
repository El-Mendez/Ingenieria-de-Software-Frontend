/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { cleanup } from '@testing-library/react';
import { By, until } from 'selenium-webdriver';
import Login from '../pages/login';
import Recommendations from '../pages/suggestions';
import BaseConfig from '../base_config';

export default class Suggestions extends BaseConfig {
  constructor(browser, host, type = 1) {
    super();
    this.init(browser);
    this.host = host;
    this.type = type;
  }

  async start() {
    describe('Visit my profile', () => {
      beforeAll(async () => {
        await this.openPage(`http://${this.host}/`);
        this.login = await new Login(this.driver);
        this.recommendations = await new Recommendations(this.driver);
      }, 100000);

      test('Log in', async () => {
        await this.login.logInAction();
        await this.driver.wait(until.elementLocated(By.id('dash-container')), 10000);
        expect(await this.driver.getCurrentUrl()).toEqual(`http://${this.host}/home`);
      }, 10000);

      test('Look up for courses recommendations', async () => {
        await this.recommendations.suggestionsAction(this.type);
        const suggestion = await this.driver.wait(until.elementLocated(By.id('suggestionResult')), 10000);
        expect(suggestion).toBeTruthy();
      }, 100000);

      beforeEach(() => {
        cleanup();
      });

      afterAll(() => {
        this.close();
      });
    });
  }
}
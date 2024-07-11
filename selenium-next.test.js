const {Builder, By, Key, until} = require("selenium-webdriver");
require('dotenv').config();

describe("Testing NextJs Application with selenium and Jest", ()=>{
	let driver;

	beforeAll(async ()=> {
		driver = await new Builder().forBrowser("chrome").build();
		//await driver.manage.window.maximize();
	});

	afterAll(async ()=> {
		await driver.quit();
	});

	it(`Testing homepage's title is "Home"`, async () => {
		await driver.get(process.env.url);
		const title = await driver.getTitle()
		expect(title).toEqual("Home");
	});

	it(`Testing contact page's title is "Contact Us"`, async () => {
		await driver.get(process.env.url + '/contact');
		const title = await driver.getTitle()
		expect(title).toEqual("Contact Us");
	});

	it(`Testing contact page's title is "Contact Us"`, async () => {
		await driver.get(driver.getCurrentUrl());
		const input = await driver.findElement(By.id("formInput"));
		const btn = await driver.findElement(By.id("formSubmit"));
		
		await input.sendKeys("snymax@gmail.com", Key.TAB);
		await btn.click();
		await driver.sleep(1e3);
		const res = await driver.findElement(By.id("formMessage")).getText();
		expect(res).toEqual("More info coming to snymax@gmail.com")

	});
})
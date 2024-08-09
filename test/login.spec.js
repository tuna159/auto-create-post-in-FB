const { expect } = require("chai");

require("dotenv").config();

describe("Login", function () {
  let page;

  before(async function () {
    page = await browser.newPage();
    await page.goto(`${process.env.BASE_URL}`);
  });

  after(async function () {
    await page.close();
  });

  it("Đăng nhập", async function () {
    await page.waitForSelector("input[name=email]");
    await page.click('input[name="email"]');
    await page.$eval(
      "input[name=email]",
      (el) => (el.value = "huyentrangvndirect@gmail.com")
    );

    await page.waitForSelector("input[name=pass]");
    await page.click('input[name="pass"]');
    await page.$eval("input[name=pass]", (el) => (el.value = "Anhtu1234@"));
    await page.click('button[type="submit"]');

    expect(await page.url()).to.eql(`${process.env.BASE_URL}`);
  }).timeout(20000);

  it("Search Group", async function () {
    await page.waitForSelector("input[aria-label='Tìm kiếm trên Facebook']", {
      visible: true,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await page.type(
      "input[aria-label='Tìm kiếm trên Facebook']",
      "Huyện Kim Sơn"
    );

    await page.keyboard.press("Enter");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(await page.url()).to.eql(
      `https://www.facebook.com/search/top/?q=Huy%E1%BB%87n%20Kim%20S%C6%A1n`
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector("text/Truy cập");
    await page.click("text/Truy cập");
    await page.waitForNavigation();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector("text/Bạn viết gì đi...");
    await page.click("text/Bạn viết gì đi...");
    await page.waitForNavigation();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector("text/Tạo bài viết");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(await page.url()).to.eql(
      `https://www.facebook.com/groups/333986258960486`
    );
  }).timeout(30000);

  it("Tạo bài viết", async function () {
    await page.waitForSelector("text/Bạn viết gì đi...");
    await page.click("text/Bạn viết gì đi...");
    await page.waitForNavigation();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.waitForSelector("text/Tạo bài viết");

    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(await page.url()).to.eql(
      `https://www.facebook.com/groups/333986258960486`
    );
  }).timeout(30000);
});

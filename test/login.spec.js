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
    await page.type('input[name="email"]', process.env.FB_EMAIL);

    await page.waitForSelector("input[name=pass]");
    await page.type('input[name="pass"]', process.env.FB_PASSWORD);

    await page.click('button[type="submit"]');

    expect(await page.url()).to.eql(`${process.env.BASE_URL}`);
  }).timeout(20000);

  it("Go To Group", async function () {
    await new Promise((resolve) => setTimeout(resolve, 30000));

    await page.waitForSelector(
      'a[href="https://www.facebook.com/groups/333986258960486/"]'
    );

    await page.click(
      'a[href="https://www.facebook.com/groups/333986258960486/"]'
    );

    await page.waitForNavigation();
    expect(await page.url()).to.include("groups/333986258960486");
  }).timeout(30000);

  it("Tạo bài viết", async function () {
    await page.waitForSelector("text/Bạn viết gì đi...");
    await page.click("text/Bạn viết gì đi...");

    // Đợi vùng tạo bài viết tải
    await page.waitForSelector("[aria-label='Tạo bài viết công khai...']");
    await page.type(
      "[aria-label='Tạo bài viết công khai...']",
      "Đây là một bài viết kiểm thử!"
    );

    await page.waitForSelector("[aria-label='Ảnh/video']");

    await page.click("[aria-label='Ảnh/video']");

    await page.waitForSelector("text/Thêm ảnh/video");
    await page.click("text/Thêm ảnh/video");

    // Nhấp vào nút Ảnh/video
    await page.waitForSelector('input[type="file"]'); // Sửa lại selector cho chính xác
    const inputUploadHandle = await page.$('input[type="file"]'); // Sửa lại selector cho chính xác

    // Tải ảnh từ máy của bạn lên
    await inputUploadHandle.uploadFile(
      `D:/Wano Project/Tu/auto-create-post-in-FB/image/anh1.jpg` // Sửa đường dẫn nếu cần
    );

    // Đợi ảnh tải lên xong
    await page.waitForSelector('img[alt="Hình ảnh đã tải lên"]');

    // Gửi bài viết
    await page.click("[aria-label='Đăng']");
    await page.waitForNavigation();

    expect(await page.url()).to.eql(
      `https://www.facebook.com/groups/333986258960486`
    );
  }).timeout(30000);
});

const fs = require("fs");
const path = "./generatedCodes.json";

class UniqueCodeGenerator {
  constructor() {
    this.generatedCodes = new Set();
    this.counter = 0;
    this.loadCodes(); // Load existing codes
  }

  loadCodes() {
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path);
      const parsedData = JSON.parse(data);
      this.generatedCodes = new Set(parsedData.codes);
      this.counter = Math.max(...Array.from(this.generatedCodes).map(Number)); // Set counter to the highest existing code
    }
  }

  saveCodes() {
    const data = {
      codes: Array.from(this.generatedCodes),
    };
    fs.writeFileSync(path, JSON.stringify(data));
  }

  generateNextCode() {
    if (this.generatedCodes.size >= 10000) {
      throw new Error("Maximum unique code limit reached.");
    }

    this.counter++;
    const code = String(this.counter).padStart(4, "0");

    if (this.generatedCodes.has(code)) {
      return this.generateNextCode(); // Recursive call
    }

    this.generatedCodes.add(code);
    this.saveCodes(); // Save updated codes
    return code;
  }
}

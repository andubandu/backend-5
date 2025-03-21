import fs from 'fs/promises'

const saveData = async (file, data) => {
    await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
};

const loadData = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

export { saveData, loadData };

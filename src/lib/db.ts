import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export type Model = "services" | "spaces" | "portfolio" | "testimonials" | "blog" | "faq" | "leads";

/** Ensure directory exists and read data */
export async function getCollection<T>(model: Model): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, `${model}.json`);
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file) as T[];
  } catch (error: any) {
    // If file doesn't exist, return empty array
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/** Save collection array to file */
export async function saveCollection<T>(model: Model, data: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const filePath = path.join(DATA_DIR, `${model}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/** Insert single record */
export async function insertRecord<T extends { id?: string }>(model: Model, record: T): Promise<T> {
  const collection = await getCollection<T>(model);
  const newRecord = {
    ...record,
    id: record.id || crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };
  collection.push(newRecord);
  await saveCollection(model, collection);
  return newRecord;
}

/** Update single record */
export async function updateRecord<T extends { id?: string }>(model: Model, id: string, payload: Partial<T>): Promise<T | null> {
  const collection = await getCollection<T>(model);
  const index = collection.findIndex(item => item.id === id);
  if (index === -1) return null;

  collection[index] = { ...collection[index], ...payload, updatedAt: new Date().toISOString() };
  await saveCollection(model, collection);
  return collection[index];
}

/** Delete single record */
export async function deleteRecord(model: Model, id: string): Promise<boolean> {
  const collection = await getCollection<{ id?: string }>(model);
  const filtered = collection.filter(item => item.id !== id);
  if (collection.length === filtered.length) return false;
  
  await saveCollection(model, filtered);
  return true;
}

export function chunkArray(list = [], size = 1) {
  if (!Array.isArray(list) || size <= 0) {
    return [];
  }

  const chunks = [];
  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }
  return chunks;
}

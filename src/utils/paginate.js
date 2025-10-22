export function paginate(data, page = 1, perPage = 12) {
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return { pageData: data.slice(start, end), totalPages, total };
}

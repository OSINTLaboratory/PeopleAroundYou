async ({ id }) => {
  const data = await domain.db.query(
    'SELECT login FROM "SystemUser" WHERE "systemUserId"=$1 ',
    id
  );
  return { data };
};

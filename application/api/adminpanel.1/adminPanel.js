async ({ login, password, role }) => {
  const groupid = role === "Администратор" ? 1 : 2;

  const hash = await metarhia.metautil.hashPassword(password);
  await application.auth.registerUser(login, hash);

  return { status: "success" };
};

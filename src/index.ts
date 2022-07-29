import server from "./express";

const app = server(); //guardando a execução
const port = (app.get("port")); //inserindo a porta à execução
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); //executando servidor juntamente com a porta
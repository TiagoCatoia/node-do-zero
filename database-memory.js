import { randomUUID } from "node:crypto";

export class DatabaseMemory {
  #videos = new Map();

  list(search) {
    return Array.from(this.#videos.entries())
      .map((videoArray) => {
        const id = videoArray[0];
        const data = videoArray[1];

        return {
          id,
          ...data, // spread operator
        };
      })
      .filter((video) => {
        // parâmetro opcional
        if (search) {
          return video.title.includes(search);
        }

        return true;
      });
  }

  create(video) {
    const videoId = randomUUID(); // UUID - Unique Universal ID

    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}

// # chave privada (informação vista apenas por dentro da classe)
// #videos só pode ser acessado ou modificado dentro dos métodos da própria classe DataBaseMemory
// Estrutura de Dados: Set(espécie de array porém não aceita valores duplicados), Map(espécie de objeto js)

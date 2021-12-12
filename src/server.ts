export function fetchData() {
  return new Promise<Post[]>((resolve) => {
    setTimeout(
      () =>
        resolve(
          Array(10)
            .fill(0)
            .map(() => ({ author: "Ayson", content: "What a wonderful day!" }))
        ),
      1000
    );
  });
}

export interface Post {
  author: string;
  content: string;
}

export async function onRequestGet(context) {
    // データベースから最新20件を取得
    const { results } = await context.env.DB.prepare(
        "SELECT * FROM messages ORDER BY id DESC LIMIT 20"
    ).all();
    return new Response(JSON.stringify(results.reverse()));
}

export async function onRequestPost(context) {
    const { user, text } = await context.request.json();
    // データベースに保存
    await context.env.DB.prepare(
        "INSERT INTO messages (user, text) VALUES (?, ?)"
    ).bind(user, text).run();
    return new Response("OK");
}

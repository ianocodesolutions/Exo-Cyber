const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function chargerMessages() {
  const { data } = await db.from("messages").select("*").order("created_at", { ascending: false });
  let html = "";
  (data || []).forEach(function (m) {
    html += '<article class="message"><strong>' + m.pseudo + "</strong><p>" + m.contenu + "</p></article>";
  });
  $("#liste").html(html);
}

$("#form-message").on("submit", async function (e) {
  e.preventDefault();
  await db.from("messages").insert({ pseudo: $("#pseudo").val(), contenu: $("#contenu").val() });
  this.reset();
  chargerMessages();
});

$("#form-inscription").on("submit", async function (e) {
  e.preventDefault();
  await db.from("inscrits").insert({
    prenom: $("#prenom").val(),
    nom: $("#nom").val(),
    email: $("#email").val(),
    telephone: $("#telephone").val(),
    adresse: $("#adresse").val()
  });
  this.reset();
  $("#confirmation").html("Merci, vous êtes inscrit !");
});

chargerMessages();

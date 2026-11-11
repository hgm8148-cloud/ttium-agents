// La traduction automatique du navigateur (Chrome, Edge…) remplace les textes de la page par les siens.
// React ne le sait pas : quand il veut ensuite retirer ou insérer un texte, le nœud a changé de parent,
// et l'erreur (« removeChild » / « insertBefore ») efface tout le bureau : l'écran devient noir.
// Ici, on ignore ces deux cas au lieu de planter. Le texte traduit peut rester un peu en retard, c'est tout.
// (Contournement connu : https://github.com/facebook/react/issues/11538)
export function guardAgainstTranslation(): void {
  const proto = Node.prototype;
  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };
  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref) as T;
  };
}

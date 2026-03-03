import Obsidia.Merkle
namespace Obsidia.Seal
abbrev File := String
axiom fileHash : File → Obsidia.Hash
noncomputable axiom combine : List Obsidia.Hash → Obsidia.Hash
axiom fileHash_inj (f g : File) (h : fileHash f = fileHash g) : f = g
axiom combine_inj (hs ks : List Obsidia.Hash) (h : combine hs = combine ks) : hs = ks
noncomputable def rootHash (files : List File) : Obsidia.Hash := combine (files.map fileHash)
noncomputable def globalSeal (mHash rHash : Obsidia.Hash) : Obsidia.Hash := Obsidia.merkle2 mHash rHash
theorem P13_Immutability
    (manifest : Obsidia.Hash) (files files2 : List File)
    (hmap : files.map fileHash ≠ files2.map fileHash) :
    globalSeal manifest (rootHash files) ≠ globalSeal manifest (rootHash files2) := by
  have hcombine : combine (files.map fileHash) ≠ combine (files2.map fileHash) := by
    intro heq; exact hmap (combine_inj _ _ heq)
  have hroot : rootHash files ≠ rootHash files2 := by
    intro heq
    apply hcombine
    exact heq
  unfold globalSeal
  exact Obsidia.merkle2_right_mutation manifest (rootHash files) (rootHash files2) hroot
end Obsidia.Seal

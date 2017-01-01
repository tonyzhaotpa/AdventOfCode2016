const valid_moves = [
"+ot","+op","+or","+oc","+oe","+od",
"+tp","+tr","+tc","+te","+td",
"+pr","+pc","+pe","+pd",
"+rc","+re","+rd",
"+ce","+cd",
"+ed",
"+OT","+OP","+OR","+OC","+OE","+OD",
"+TP","+TR","+TC","+TE","+TD",
"+PR","+PC","+PE","+PD",
"+RC","+RE","+RD",
"+CE","+CD",
"+ED",
"+Oo","+Tt","+Pp","+Rr","+Cc","+Ee","+Dd",
"+O","+T","+P","+R","+C","+E","+D","+o","+t","+p","+r","+c","+e","+d",
"-O","-T","-P","-R","-C","-E","-D","-o","-t","-p","-r","-c","-e","-d"]

backtrack(root({floors: ["RTrtCcEeDdOP","op","",""], e: 0}))

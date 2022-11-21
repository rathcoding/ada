//====================================================================
// Aqui ficará a função para cálculo de match entre Skills da Professional e Skills do Job
// Recebe duas listas de skills: (skillsPro, skillsJob)
// Ex: [ { id: 1, level: "Sênior", experience: 3.5 } ]
// Retorna um Float
function match(skillsJob, skillsPro) {
  let totSkills = 0;
  let matchJob = 0.0;

  skillsJob.forEach((skJob) => {
    let skPro = skillsPro.find((sk) => sk.id === skJob.id);

    if (skPro) {
      matchJob += matchSkill(skJob, skPro);
    }

    totSkills += 1;
  });

  if (totSkills > 0) {
    return Math.min(100, matchJob / totSkills);
  }

  return 0.0;
}
//====================================================================
// Calcula o match entre um skill do Job e um skill da Professional
// Objetos de entrada: Ex: { level: "Sênior", experience: 3.5 }
// Retorna um Float
function matchSkill(skJob, skPro) {
  let matchLvl = 0.0;
  let matchExp = 0.0;
  const level = {
    Júnior: 1,
    Pleno: 2,
    Sênior: 3,
  };

  // match Level
  matchLvl = Math.min(60, 50 * (level[skPro.level] / level[skJob.level]));

  // match Experience
  matchExp = Math.min(70, 50 * (skPro.experience / skJob.experience));

  // Match geral da canditada/vaga = média dos matches dos skills...
  return Math.min(100, matchLvl + matchExp);
}

//====================================================================
// Retorna a proporção de skills atendidos.
function softMatch(skillsJob, skillsPro) {
  let tot = 0;

  skillsJob.forEach((skJob) => {
    let skPro = skillsPro.find((sk) => sk.id === skJob.id);

    if (skPro) {
      tot += 1;
    }
  });

  return (100 * tot) / skillsJob.length;
}
//====================================================================

job = [
  {
    id: 1,
    level: "Sênior",
    experience: 3.5,
  },
  {
    id: 2,
    level: "Plano",
    experience: 2.0,
  },
  {
    id: 55,
    level: "Júnior",
    experience: 1.5,
  },
];

pro = [
  {
    id: 1,
    level: "Pleno",
    experience: 3.5,
  },
  {
    id: 55,
    level: "Pleno",
    experience: 2.5,
  },
  {
    id: 100,
    level: "Pleno",
    experience: 2.5,
  },
];

(function(){
  'use strict';
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('main-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click', function(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')})});
  }
  var form = document.getElementById('prompt-form');
  var output = document.getElementById('prompt-output');
  var result = document.getElementById('result');
  var status = document.getElementById('result-status');
  var copy = document.getElementById('copy-prompt');
  var specs = {
    'debate':'um debate orientado, com duas posições defensáveis, papéis para grupos, questões disparadoras e rubrica',
    'caso':'um estudo de caso fictício, com contexto, evidências, perguntas, respostas esperadas e critérios de avaliação',
    'jogo':'um jogo didático com objetivo, materiais necessários, regras, etapas, pontuação e gabarito',
    'prova':'uma avaliação de 8 questões contextualizadas, com gabarito explicado e rubrica de correção',
    'plano':'um plano de aula completo, com objetivos, abertura, desenvolvimento, prática e avaliação'
  };
  function val(name){return String(form.elements[name].value||'').trim()}
  if(form && result && output){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var tema=val('tema');
      if(!tema){form.elements.tema.focus();return}
      var prompt='Você é um especialista em planejamento pedagógico para professores brasileiros.\n\n'+
      'Crie '+specs[val('tipo')]+'.\n\n'+
      'Disciplina: '+val('disciplina')+'\n'+
      'Tema: '+tema+'\n'+
      'Turma: '+val('turma')+'\n'+
      'Tempo total de aula: '+val('tempo')+' minutos.\n\n'+
      'CRITÉRIOS OBRIGATÓRIOS:\n'+
      '1. Defina 2 a 3 objetivos de aprendizagem claros.\n'+
      '2. Organize a aplicação em etapas e distribua o tempo disponível.\n'+
      '3. Use exemplos próximos da realidade dos alunos.\n'+
      '4. Estimule análise, participação ativa e justificativas, não apenas memorização.\n'+
      '5. Entregue instruções separadas para professor e alunos.\n'+
      '6. Inclua gabarito ou respostas esperadas e critérios objetivos de avaliação.\n'+
      '7. Apresente uma alternativa acessível e de baixo custo.\n'+
      '8. Não invente leis, dados, citações ou referências. Sinalize o que exige checagem.\n\n'+
      'FORMATO FINAL: materiais editáveis em português brasileiro, prontos para revisão docente.\n'+
      'Antes de finalizar, verifique coerência, nível da turma e duração.';
      output.textContent=prompt;
      result.classList.add('show');
      status.textContent='Seu prompt está pronto. Copie e utilize na IA de sua preferência.';
      result.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});
    });
    copy.addEventListener('click',function(){
      var text=output.textContent;
      if(navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(text).then(function(){status.textContent='✓ Prompt copiado para a área de transferência.'}).catch(function(){fallbackCopy(text)})
      }else{fallbackCopy(text)}
    });
    function fallbackCopy(text){
      var ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();
      try{document.execCommand('copy');status.textContent='✓ Prompt copiado.'}catch(err){status.textContent='Selecione e copie o prompt acima.'}
      ta.remove();
    }
  }
})();

# Templates de e-mail do Grana

## Os dois do Supabase Auth (colar no painel)
Authentication > Emails > Templates

| Arquivo | Template no Supabase | Assunto sugerido |
|---|---|---|
| `confirmacao-cadastro.html` | Confirm signup | Confirme seu e-mail no Grana |
| `recuperacao-senha.html` | Reset password | Crie uma nova senha no Grana |

Cole o conteúdo do arquivo no campo de corpo (HTML) e o assunto no campo Subject.
As variáveis `{{ .ConfirmationURL }}` e `{{ .Data.name }}` são do próprio Supabase.

## Os dois enviados por função nossa (ainda a criar)
| Arquivo | Quando |
|---|---|
| `boas-vindas.html` | Depois que a pessoa confirma o e-mail |
| `sentindo-sua-falta.html` | 7 dias sem lançamento, uma única vez |

Variáveis que o código troca antes de enviar: `{{nome}}`, `{{app_url}}` e `{{unsubscribe_url}}`.

## Notas
- Fontes: o e-mail usa Arial. A Maven Pro não carrega na maioria dos clientes de e-mail.
- Logo: o topo é um texto "Grana". Quando houver um PNG do logo hospedado, troque o texto por uma imagem (SVG não aparece no Gmail).

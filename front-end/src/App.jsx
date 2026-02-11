import { postRegister } from "./services/registerService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const formSchema = z.object({
    nome: z
      .string()
      .min(1, "Nome é obrigatório")
      .max(100, "Máximo de 100 caracteres"),
    email: z.email("Formato inválido"),
    dataNascimento: z
      .date({ required_error: "Data de nascimento é obrigatória" })
      .refine((date) => date < new Date(), "A data deve ser anterior a hoje"),
    profissao: z.string().min(1, "Profissão é obrigatória"),
    observacoes: z.string().max(1000, "Máximo de 1000 caracteres").optional(),
  });

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      dataNascimento: null,
      profissao: "",
      observacoes: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = { ...data };

    if (payload.dataNascimento) {
      const d = payload.dataNascimento;
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      payload.dataNascimento = `${yyyy}/${mm}/${dd}`;
    }

    try {
      await postRegister(payload);
    } catch (error) {
      if (error.response.status === 400) {
        alert("Email já cadastrado!");
        return;
      }
      alert("Erro ao registrar usuário");
    } finally {
      reset();
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-4">
          <h1 className="h3 fw-bold">Cadastro</h1>
          <p className="text-muted">Preencha os campos abaixo</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded shadow-sm"
        >
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="Seu nome completo"
              {...register("nome")}
            />
            {errors.nome && (
              <div className="invalid-feedback">{errors.nome.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="seu@email.com"
              {...register("email")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Data de Nascimento</label>
            <Controller
              control={control}
              name="dataNascimento"
              render={({ field }) => (
                <DatePicker
                  className={`form-control ${errors.dataNascimento ? "is-invalid" : ""}`}
                  selected={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  placeholderText="Selecione uma data"
                />
              )}
            />
            {errors.dataNascimento && (
              <div className="invalid-feedback d-block">
                {errors.dataNascimento.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Profissão</label>
            <Controller
              control={control}
              name="profissao"
              render={({ field }) => (
                <select
                  className={`form-select ${errors.profissao ? "is-invalid" : ""}`}
                  {...field}
                >
                  <option value="">Selecione uma profissão</option>
                  <option value="programador">Programador</option>
                  <option value="consultor_de_vendas">
                    Consultor de Vendas
                  </option>
                  <option value="sdr">SDR</option>
                  <option value="suporte_ao_cliente">Suporte ao Cliente</option>
                </select>
              )}
            />
            {errors.profissao && (
              <div className="invalid-feedback">{errors.profissao.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Observações</label>
            <textarea
              className={`form-control ${errors.observacoes ? "is-invalid" : ""}`}
              rows={4}
              placeholder="Observações adicionais (opcional)"
              {...register("observacoes")}
            ></textarea>
            {errors.observacoes && (
              <div className="invalid-feedback">
                {errors.observacoes.message}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

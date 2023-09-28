import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../API";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      return;
    }

    const response = await registerUser(data.username, data.password);

    if (response.success) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password);

      navigate("/posts");
    } else {
      alert("try again");
    }
  };

  return (
    <form className="registration" onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <label>Username: </label>
      <input
        {...register("username", {
          required: true,
          minLength: 8,
          maxLength: 21,
        })}
        name="username"
        type="text"
        id="username"
        placeholder="Username"
        aria-invalid={errors.username ? "true" : "false"}
      />
      {errors.username?.type === "required" && <p>Username is required</p>}
      {errors.username?.type <= "minLength" && (
        <p>Username must have at least 8 characters</p>
      )}
      <label>Password: </label>
      <input
        {...register("password", {
          required: true,
          minLength: 8,
          maxLength: 21,
        })}
        name="password"
        type="password"
        id="password"
        placeholder="********"
      />
      {errors.password?.type === "required" && <p>Password Required</p>}
      {errors.password?.type <= "minLength" && (
        <p>Password must have at least 9 characters</p>
      )}
      <label>Confirm Password: </label>
      <input
        {...register("confirmpassword", { required: true })}
        type="password"
        id="passwordr"
        placeholder="********"
      />
      {watch("confirmpassword") !== watch("password") &&
      getValues("confirmpassword") ? (
        <p>Password must match</p>
      ) : null}
      <button>Register</button>
      <a className="login-register" href="/account/login">
        Already have an account? Log In
      </a>
    </form>
  );
}
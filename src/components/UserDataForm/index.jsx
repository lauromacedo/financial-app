import './style.css';




export default function UserDataForm({ userData, uptadeInputsField, nameError, emailError }) {


  return (
    <div className='container-user-data'>
      <h1 className='title-user-data'>Adicione seus dados</h1>
      <form className='user-form'>
        <label className='user-label' htmlFor="nome">Nome*</label>
        <input
          className='user-input'
          type="text"
          name="name"
          id="name"
          placeholder='Digite seu nome'
          value={userData.name || ""}
          onChange={(e) => { uptadeInputsField("name", e.target.value) }}
          required
        />
        {nameError &&
          <p className='error-message'>{nameError}</p>
        }

        <label className='user-label' htmlFor="email">E-mail*</label>
        <input
          className='user-input '
          type="email"
          name="emal"
          id="email"
          placeholder='Digite seu e-mail'
          value={userData.email || ""}
          onChange={(e) => uptadeInputsField("email", e.target.value)}
          required
        />
        {emailError &&
          <p className='error-message'>{emailError}</p>
        }

      </form>
    </div>
  )
}
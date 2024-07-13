import { Form, useSubmit } from 'react-router-dom'
import InputField from './InputField'

function CategoryForm () {
  const submit = useSubmit()
  const handleSubmit = e => {
    e.preventDefault()
    submit(e.target.form)
    e.target.form.reset()
  }
  return (
    <>
      <Form
        noValidate
        className='form category'
        method='POST'
        encType='multipart/form-data'
        replace
      >
        <h1>Add Category</h1>
        <InputField inputName='Category Name' type='text' required />
        <div className='field'>
          <input type='file' className='input svg' id='svg' name='file' />
        </div>
        <div className='field'>
          <input
            type='file'
            className='input video'
            id='video'
            name='file'
          ></input>
        </div>
        <button type='submit' className='btn' onClick={handleSubmit}>
          Add Category
        </button>
      </Form>
    </>
  )
}

export default CategoryForm

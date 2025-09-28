import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal/Modal';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, type NoteData } from '../../lib/api';


interface NoteFormProps {
  onClose: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('This is a required field'),
  content: Yup.string().max(500, 'Content must be at most 500 characters'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Please select a valid tag')
    .required('A tag is required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient=useQueryClient();

  const mutation =useMutation({
    mutationFn:(newNote:NoteData)=>createNote(newNote),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["notes"]})
      onClose();
    }
  })
  const handleSubmit = (values:NoteData) => {
    mutation.mutate(values)
    
  };

  return (
    <Modal onClose={onClose}>
      <Formik
        initialValues={{ title: '', content: '', tag: 'Todo' }}
        validationSchema={NoteSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              type="text"
              name="title"
              className={css.input}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              id="content"
              name="content"
              as="textarea"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={css.submitButton}>
              Create note
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}
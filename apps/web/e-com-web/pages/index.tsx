import styles from './index.module.css';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      hello
      <form
        onSubmit={(e) => {
          const other = {
            available: true,
            currency: 'dolore',
            description: 'Excepteur dolor',
            id: 1890050324,
            image: 'asQ0W9a+DzW',
            inventory: {
              id: 1827546520,
              value: -1649693519,
            },
            name: 'velit',
            price: -1725259853,
            weight: 1567344603,
          };
          e.preventDefault();
          // Read the form data
          const form = e.target;
          const formData = new FormData(form);
          for (const key in other) {
            formData.append(key, other[key]);
          }
          console.log(formData);
          fetch('http://localhost:3000/v1/product-catalog', {
            method: 'POST',
            body: formData,
          });
        }}
      >
        <input name="file" type="file" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Index;

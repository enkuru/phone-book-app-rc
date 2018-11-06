export default (schema) => {
  schema.add({createdAt: Date, updatedAt: Date});

  schema.pre('save', function (next) {
    this.updatedAt = Date.now();
    (this.createdAt) || (this.createdAt = this.updatedAt);
    next();
  })
};